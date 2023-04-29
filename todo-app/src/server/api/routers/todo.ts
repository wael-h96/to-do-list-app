import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.task.findMany();
  }),
  addTodo: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(({ ctx, input }) => {
      const { title, description } = input;
      return ctx.prisma.task.create({
        data: {
          title: title,
          description: description,
        },
      });
    }),
  deleteTodo: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.task.delete({
      where: {
        id: input,
      },
    });
  }),
  searchTodo: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.task.findMany({
        where: {
          title: input,
        },
      });
    }),
  updateTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        id: z.number(),
        status: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, description, id, status } = input;
      return await ctx.prisma.task.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          description: description,
          status: status,
          updated_at: new Date(),
        },
      });
    }),
});
