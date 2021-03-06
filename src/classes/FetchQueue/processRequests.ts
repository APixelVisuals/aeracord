import { FetchedData, FetchQueue, Request } from "../../internal";

export default async function processRequests(fetchQueue: FetchQueue) {

    // Define sleep function
    const sleep = (amount: number) => new Promise((resolve) => setTimeout(resolve, amount));

    // Set processing requests
    fetchQueue.processingRequests = true;

    // Loop through the queue until it's empty
    while (fetchQueue.queue.length > 0) {

        // Get request
        const request: Request | undefined = fetchQueue.queue.shift();
        if (!request) break;

        // Await global rate limit
        if (fetchQueue.client._globalRateLimitReset) await fetchQueue.client._globalRateLimitReset;

        // Await rate limit
        if ((fetchQueue.rateLimit) && (fetchQueue.rateLimit.remaining === 0)) await sleep(fetchQueue.rateLimit.reset - Date.now());

        // Fetch
        const result: FetchedData = await fetchQueue.client.fetch({
            path: request.path,
            method: request.method,
            contentType: request.contentType,
            body: request.data,
            auditLogReason: request.auditLogReason
        }).catch((err: Error) => request.reject(err));
        if (!result) continue;

        // Rate limited
        if (result.rateLimited) {

            // Add the request back to the front of the queue
            fetchQueue.queue.unshift(request);

            // Continue
            continue;
        }

        // Resolve
        request.resolve(result.data);
    }

    // Set processing requests
    fetchQueue.processingRequests = false;
}