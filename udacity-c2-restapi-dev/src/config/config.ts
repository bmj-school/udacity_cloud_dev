export const config = {
  "dev": {
    "username":         process.env.POSTGRES_USERNAME,
    "password":         process.env.POSTGRES_PASSWORD,
    "database":         process.env.POSTGRES_DATABASE,
    "host":             process.env.POSTGRES_HOST,
    "dialect":          "postgres",
    "aws_reigion":      process.env.POSTGRES_AWS_REGION,
    "aws_profile":      process.env.POSTGRES_AWS_PROFILE,
    "aws_media_bucket": process.env.POSTGRES_AWS_MEDIA_BUCKET
  },  
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt": {
    "secret": process.env.JWT_SECRET
  }
}
