import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const createTodo = createTRPCRouter({
  createTodo: protectedProcedure
    .input(z.object({ task: z.string(), description: z.string() }))
    .mutation(({ ctx, input }) => {
      ctx.db.todo.create({
        data: {
          todoId: ctx.session.user.id,
          task: input.task,
        },
      });
    }),

  getTodo: protectedProcedure.query(({ ctx }) => {
    ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        todo: true,
      },
    });
  }),
});
