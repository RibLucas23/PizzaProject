export async function POST(req) {
	const data = await req.formData();
	if (data.get('file')) {
		//aca iria la logica para subir archivos a AWS a un bucket para generar la BD de imagenes
		// npm i @aws-sdk/client-s3
		const AWS_ACCES_KEY = 'acces'; //.env
		const AWS_SECRET_KEY = 'key'; //.env
		const file = data.get('file');
		const s3Client = S3Client({
			regin: 'us-east-1',
			credentials: {
				accesKeyId: AWS_ACCES_KEY,
				secretAccessKey: AWS_SECRET_KEY,
			},
		});
		const ext = file.name.split('.').slice(-1)[0];
		const newFileName = 'uniqueId' + ext;
		const chunks = [];
		for await (const chunk of file.stream()) {
			chunks.push(chunk);
		}
		const buffer = Buffer.concat(chunks);
		s3Client.send(
			new PutObjectCommand({
				Bucket: 'nombre del bucket',
				Key: newFileName,
				ACL: 'public-read',
				ContentType: file.type,
				Body: buffer,
			}),
		);
		return Response.json('el link de aws bucke.com/' + newFileName);
	}
	return Response.json(true);
}
