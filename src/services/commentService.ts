import { AddCommentDTO, CommentDTO, ReplyToCommentDTO } from "@/dto/commentDTO";
import { EventDTO } from "@/dto/eventDTO";
import { normalizeDotNetJson } from "@/utils/deserializeHelper";

type ReturnedDTO = {
  commentDto: CommentDTO;
  message: string;
}

export const addComment = async (token: string, body: AddCommentDTO): Promise<CommentDTO> => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const response = await fetch(`${apiUrl}/Comment/CommentEvent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error('Failed to add comment');
  }

  const rawComment = await response.json();
  const deserializedResponse: ReturnedDTO = normalizeDotNetJson<ReturnedDTO>(rawComment);
  return deserializedResponse.commentDto;
}

export const replyToComment = async (token: string, comment: ReplyToCommentDTO): Promise<CommentDTO> => {
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
  const deserializedResponse: ReturnedDTO = normalizeDotNetJson<ReturnedDTO>(rawComment);
  return deserializedResponse.commentDto;
}