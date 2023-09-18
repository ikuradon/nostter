import { Kind, type Event, SimplePool } from 'nostr-tools';
import { Api } from './Api';
import { defaultRelays } from './Constants';
import { rxNostr } from './Global';
import { parseRelayJson } from './EventHelper';

export class RelayList {
	public static async fetchEvents(
		pubkey: string,
		relays: string[] = []
	): Promise<Map<Kind, Event>> {
		const pool = new SimplePool();
		const api = new Api(pool, Array.from(new Set([...relays, ...defaultRelays])));

		const saveCache = (events: Map<Kind, Event>, cachedEvents: Map<Kind, Event>): void => {
			// Save cache
			for (const [kind, event] of events) {
				const cache = cachedEvents.get(kind);
				if (cache !== undefined && cache.created_at >= event.created_at) {
					continue;
				}
				localStorage.setItem(`nostter:kind:${kind}`, JSON.stringify(event));
			}
		};

		// Load cache
		const cachedEvents = new Map(
			[Kind.RecommendRelay, Kind.Contacts, Kind.RelayList]
				.map((kind) => {
					const event = localStorage.getItem(`nostter:kind:${kind}`);
					if (event === null) {
						return null;
					}
					try {
						return [kind, JSON.parse(event) as Event];
					} catch (error) {
						return null;
					}
				})
				.filter((x): x is [Kind, Event] => x !== null)
		);
		if (cachedEvents.size > 0) {
			api.fetchRelayEvents(pubkey).then((events) => {
				api.close();
				saveCache(events, cachedEvents);
			});
			return cachedEvents;
		}

		const events = await api.fetchRelayEvents(pubkey);

		api.close();
		saveCache(events, cachedEvents);

		return events;
	}

	public static async apply(eventsMap: Map<Kind, Event>) {
		const kind10002 = eventsMap.get(10002);
		const kind3 = eventsMap.get(3);
		if (kind10002 !== undefined) {
			await rxNostr.switchRelays(kind10002.tags);
		} else if (kind3 !== undefined && kind3.content !== '') {
			await rxNostr.switchRelays(
				[...parseRelayJson(kind3.content)].map(([url, { read, write }]) => {
					return { url, read, write };
				})
			);
		}
	}
}