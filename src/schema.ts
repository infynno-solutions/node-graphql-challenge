import {
  arg,
  asNexusMethod,
  inputObjectType,
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: (_parent, _args, context) => {
        return context.prisma.user.findMany()
      },
    })

    t.nullable.field('user', {
      type: 'User',
      args: {
        id: stringArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.user.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })

    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (_parent, _args, context) => {
        return context.prisma.post.findMany()
      },
    })

    t.nullable.field('post', {
      type: 'Post',
      args: {
        id: stringArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.post.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        data: nonNull(
          arg({
            type: 'UserCreateInput',
          }),
        ),
      },
      resolve: (_, args, context) => {
        const posts = args.data.posts?.map((post: any) => {
          return { title: post.title, content: post.content }
        })

        return context.prisma.user.create({
          data: {
            name: args.data.name,
            email: args.data.email,
            posts: {
              create: posts,
            },
          },
        })
      },
    })
    // TODO: Add mutation to create post
    // TODO: Add mutation to update post
    // TODO: Add mutation to delete post
  },
})

const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('name')
    t.list.nonNull.field('posts', { type: 'PostCreateInput' })
  },
})

const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.nonNull.string('content')
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts()
      },
    })
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author()
      },
    })
  },
})

export const schema = makeSchema({
  types: {
    Query,
    Mutation,
    Post,
    User,
    DateTime,
    UserCreateInput,
    PostCreateInput,
  },
  outputs: {},
  contextType: {
    module: require.resolve('./context'),
    export: 'context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
