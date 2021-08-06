# Infynno NodeJS Graphql Challenge

## Steps to start development

1. Clone this repo and install packages using npm `npm install` or yarn `yarn`
2. Run database migration using `yarn db:migrate` or `npm run db:migrate`
3. Run database seeder using `yarn db:seed` or `npm run db:seed`
4. Start the graphql server `yarn dev` or `npm run dev`

Note: If server doesn't restart automatically after changing any file terminate existing process and run `yarn dev` or `npm run start` again.

## Information

- We are using `Prisma` as our orm it's pretty easy to use check this [documentation](https://www.prisma.io/docs/concepts/components/prisma-client/crud) for basic crud operations.
- We are using `code-first` approach for Graphql using `nexus` library check this [documentation](https://nexusjs.org/docs) for more information
- Database schema is located at `/prisma/schema.prisma`

## Task

1. Create mutation to create post
2. Create mutation to update post
3. Create mutation to delete post

## Submission

After completing challenge you have to submit this to us there are few ways to do that select whichever is easier to you.

1. Fork this repo and create a pull request
2. Create your own public repo and upload the code

Final Step : Send email to `hr@infynno.com` with title `YourName - NodeJS Graphql Challenge` and it should contain link to `pull request` or `your repo`
