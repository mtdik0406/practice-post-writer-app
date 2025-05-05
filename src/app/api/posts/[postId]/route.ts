import { db } from "@/lib/db";
import { postPatchSchema } from "@/lib/validations/post";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// const routeContextSchema = z.object({
//   params: z.object({
//     postId: z.string(),
//   }),
// });

export async function PATCH(
  req: NextRequest,
  // context: z.infer<typeof routeContextSchema>
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    // const { params } = routeContextSchema.parse(context);
    const { postId } = await params;

    if (!(await verifyCurrentUserHasAccessToPost(postId))) {
      return NextResponse.json(null, { status: StatusCodes.FORBIDDEN });
    }

    const json = await req.json();
    const body = postPatchSchema.parse(json);

    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(null, { status: StatusCodes.OK });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
      });
    } else {
      return NextResponse.json(null, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions);
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
  });

  return count > 0;
}
