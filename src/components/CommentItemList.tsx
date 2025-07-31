import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import GlobalStyles from '@/styles/global';
import { CommentDTO } from '@/dto/commentDTO';
import { getTimeAgo } from '@/utils/dateHelper';

type CommentItemProps = {
    comment: CommentDTO;
    onPress?: (comment: CommentDTO) => void;
    onReply?: (reply: string) => Promise<CommentDTO>;
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
            <Pressable onPress={handleReply}>
                <Text style={styles.reply}>{t('reply')}</Text>
            </Pressable>
        </View>
    );

    function showReplyInput() {
        //TODO
        console.log('Reply input shown for comment:', comment.id);
    }

    function handleReply() {
        if (onReply) {
            onReply("todo show reply input").then((newComment) => {
                console.log('New comment added:', newComment);
            }).catch((error) => {
                console.error('Error adding reply:', error);
            });
        }
    }
};

export default CommentListItem;

const styles = StyleSheet.create({
    card: {
        ...GlobalStyles.container,
        padding: 16,
        marginVertical: 8
    },
    content: {
        ...GlobalStyles.text
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
    reply: {
        ...GlobalStyles.button
    },
    replyContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    }
});

