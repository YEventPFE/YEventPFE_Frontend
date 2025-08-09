import React, { useState } from 'react';
import { Text, StyleSheet, View, Pressable, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import GlobalStyles from '@/styles/global';
import { CommentDTO } from '@/dto/commentDTO';
import { getTimeAgo } from '@/utils/dateHelper';
import CommentInputs from '@/components/CommentInputs';

type CommentItemProps = {
    comment: CommentDTO;
    onPress?: (comment: CommentDTO) => void;
    onReply?: (comment: CommentDTO, replyText: string) => Promise<CommentDTO>;
    onUserPress?: (userId: string) => void;
};

const CommentListItem: React.FC<CommentItemProps> = ({ comment, onPress, onReply, onUserPress }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.card} onTouchEnd={() => onPress?.(comment)}>
            <Text style={styles.content}>
                {comment.content || t('no_content')}
            </Text>
            <View style={styles.authorContainer}>
                <Text style={styles.author} onPress={() => onUserPress?.(comment.user.id)}>
                    {comment.user?.name || t('Unknown User')}
                </Text>
                <Text style={styles.date}>
                    {getTimeAgo(new Date(comment.date))}
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
};

export default CommentListItem;

const styles = StyleSheet.create({
    card: {
        ...GlobalStyles.container,
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
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

