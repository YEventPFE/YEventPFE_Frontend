import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import GlobalStyles from '@/styles/global';
import { CommentDTO } from '@/dto/commentDTO';
import CommentListItem from '@/components/CommentListItem';

export type CommentListProps = {
    comments: CommentDTO[];
    onCommentPress?: (comment: CommentDTO) => void;
    onReply?: (comment: CommentDTO, replyText: string) => Promise<CommentDTO>;
    onUserPress?: (userId: string) => void;
};

const CommentList: React.FC<CommentListProps> = ({ comments, onCommentPress, onReply, onUserPress }) => {
    const { t } = useTranslation();

    const [mappedComments, setMappedComments] = useState<CommentDTO[]>(comments);

    return (
        <View style={styles.container}>
            {mappedComments.map((comment) => (
                <CommentListItem
                    key={comment.id}
                    comment={comment}
                    onPress={onCommentPress}
                    onReply={handleReply}
                    onUserPress={onUserPress}
                />
            ))}
        </View>
    );

    
    async function handleReply(comment: CommentDTO, replyText: string): Promise<CommentDTO> {
        if (onReply) {
            const dto = await onReply(comment, replyText);
            console.debug("handleReply dto AVANT MAPPING", dto);
            setMappedComments((prevState) => {
                const updated = [...prevState, dto];
                console.debug("updated ----------------", updated);
                return updated;
            });
            return dto;
        }
        throw new Error('No onReply function provided');
    }
};

export default CommentList;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container
    }
});