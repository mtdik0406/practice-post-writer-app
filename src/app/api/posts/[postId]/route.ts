import { db } from "@/lib/db";
import { postPatchSchema } from "@/lib/validations/post";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  const { params } = routeContextSchema.parse(context);

  const json = await req.json();
  const body = postPatchSchema.parse(json);

  await db.post.update({
    where: {
      id: params.postId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return NextResponse.json(null, { status: 200 });
}
