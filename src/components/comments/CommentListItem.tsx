import React from 'react';
import { Text, StyleSheet, View} from 'react-native';
import { useTranslation } from 'react-i18next';
import GlobalStyles from '@/styles/global';
import { CommentDTO } from '@/dto/commentDTO';
import { useTimeAgo } from '@/utils/dateHelper';
import CommentInputs from '@/components/comments/CommentInputs';

type CommentItemProps = {
    comment: CommentDTO;
    onPress?: (comment: CommentDTO) => void;
    onReply?: (comment: CommentDTO, replyText: string) => Promise<CommentDTO>;
    onUserPress?: (userId: string) => void;
};

const CommentListItem: React.FC<CommentItemProps> = ({ comment, onPress, onReply, onUserPress }) => {
    const { t } = useTranslation();

    const timeAgo = useTimeAgo(new Date(comment.date));

    return (
        <View style={styles.card} onTouchEnd={() => onPress?.(comment)}>
            <Text style={styles.content}>
                {getCommentContent(comment)}
            </Text>
            <View style={styles.authorContainer}>
                <Text style={styles.date}>
                    {timeAgo}
                </Text>
                <Text style={styles.author} onPress={() => onUserPress?.(comment.user.id)}>
                    {comment.user?.name || t('Unknown User')}
                </Text>
            </View>
            {
                onReply && (
                    <CommentInputs
                        comment={comment}
                        onReply={onReply}
                    />
                )
            }
        </View>
    );

    function getCommentContent(comment: CommentDTO): string {
        let textContent = comment.content;
        if (comment.repliedTo && comment.repliedTo.user) {
            textContent = "@" + comment.repliedTo.user.name + " " + comment.content;
        }
        return textContent;
    }
}

export default CommentListItem;

const styles = StyleSheet.create({
    card: {
        ...GlobalStyles.container,
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        width: '100%',
    },
    content: {
        ...GlobalStyles.text,
    },
    authorContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8
    },
    author: {
        ...GlobalStyles.text
    },
    date: {
        ...GlobalStyles.text
    },
    replyContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    replyActionsContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    replyInput: {
        ...GlobalStyles.textInput,
    },
    cancelReplyButton: {
        ...GlobalStyles.cancelButton,
    },
    sendReplyButton: {
        ...GlobalStyles.button,
    },
});

