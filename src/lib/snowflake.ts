export default class SnowflakeGenerator {
	private epoch: bigint;
	private machineId: bigint;
	private sequence: bigint;
	private lastTimestamp: bigint;

	constructor(workerId: number) {
		this.epoch = BigInt(1577836800000); // 2020-01-01T00:00:00.000Z
		this.machineId = BigInt(workerId);
		this.sequence = BigInt(0);
		this.lastTimestamp = BigInt(-1);
	}

	private waitNextMillis(timestamp: bigint): bigint {
		while (timestamp === this.lastTimestamp) {
			timestamp = BigInt(Date.now()) - this.epoch;
		}
		return timestamp;
	}

	generate(): bigint {
		let timestamp = BigInt(Date.now()) - this.epoch;

		if (timestamp < this.lastTimestamp) {
			throw new Error(
				'Clock moved backwards, refusing to generate ID. Time Travel is not supported.'
			);
		}

		if (this.lastTimestamp === timestamp) {
			this.sequence = (this.sequence + BigInt(1)) & BigInt(0xfff); // 12-bit

			if (this.sequence === BigInt(0)) {
				timestamp = this.waitNextMillis(this.lastTimestamp);
			}
		} else {
			this.sequence = BigInt(0);
		}

		this.lastTimestamp = timestamp;

		return (
			((timestamp & BigInt(0x1FFFFFFFFFF)) << BigInt(22)) | // Timestamp left shift 22 bits
			(this.machineId << BigInt(12)) | // Machine ID left shift 12 bits
			this.sequence // Sequence number
		); 
	}
}