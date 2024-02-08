type SubscriberParams = { surveyOptionId: string, votes: number};
type Subscriber = (message: SubscriberParams) => void;

class VotingPubSub {
    #channels: Record<string, Subscriber[]> = {};

    subscribe(surveyId: string, subscriber: Subscriber) {
        if (!this.#channels[surveyId]) {
            this.#channels[surveyId] = [];
        }

        this.#channels[surveyId].push(subscriber);
    }

    publish(surveyId: string, message: SubscriberParams) {
        if (!this.#channels[surveyId]) {
            return;
        }

        this.#channels[surveyId].forEach(subscriber => {
            subscriber(message);
        });
    }
}

export const voting = new VotingPubSub();