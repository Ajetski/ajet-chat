import { Upload } from 'graphql-upload';

const streamToBuffer = (stream): Promise<Buffer> =>
	new Promise((resolve, reject) => {
		let buffer = Buffer.from([]);
		stream.on('data', (chunk) => (buffer = Buffer.concat([buffer, chunk])));
		stream.on('error', (err) => reject(err));
		stream.on('end', () => resolve(buffer));
	});

export const uploadFile = async (file: Upload): Promise<Buffer | null> => {
	if (!file) return null;
	const { createReadStream } =  await file.promise;

	const stream = createReadStream();
	return streamToBuffer(stream);
};

