import { CommentDTO, CreatedCommentDTO, ReplyCommentDTO } from "@/dto/commentDTO";
import { normalizeDotNetJson } from "@/utils/deserializeHelper";


export const replyToComment = async (token: string, comment: CreatedCommentDTO): Promise<CommentDTO> => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const response = await fetch(`${apiUrl}/Comment/Reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(comment)
  });

  if (!response.ok) {
    throw new Error('Failed to reply to comment');
  }

  const rawComment = await response.json();
  const deserializedResponse: ReplyCommentDTO = normalizeDotNetJson<ReplyCommentDTO>(rawComment);
  return deserializedResponse.commentDto;
}