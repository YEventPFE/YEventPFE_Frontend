import React, { useState } from 'react';
import { Text, StyleSheet, View, Pressable, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import GlobalStyles from '@/styles/global';
import { CommentDTO } from '@/dto/commentDTO';
import { getTimeAgo } from '@/utils/dateHelper';

type CommentItemProps = {
    comment: CommentDTO;
    onPress?: (comment: CommentDTO) => void;
    onReply?: (comment: CommentDTO, replyText: string) => Promise<CommentDTO>;
    onUserPress?: (userId: string) => void;
};

const CommentListItem: React.FC<CommentItemProps> = ({ comment, onPress, onReply, onUserPress }) => {
    const { t } = useTranslation();

    const [replyText, setReplyText] = useState<string>('');
    const [isReplying, setIsReplying] = useState<boolean>(false);

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
            {onReply && (
                <View style={styles.replyContainer}>
                    {!isReplying &&(
                    <Pressable onPress={() => setIsReplying(true)}>
                        <Text style={styles.sendReplyButton}>{t('reply')}</Text>
                    </Pressable>
                    )}
                    {isReplying && (
                        <>
                            <TextInput
                                style={styles.replyInput}
                                multiline={true}
                                placeholder={t('write_reply')}
                                value={replyText || ''}
                                onChangeText={setReplyText}
                            />
                            <View style={styles.replyActionsContainer}>
                                <Pressable onPress={hideReplyUi}>
                                    <Text style={styles.cancelReplyButton}>{t('cancel')}</Text>
                                </Pressable>
                                <Pressable onPress={handleReply}>
                                    <Text style={styles.sendReplyButton}>{t('send')}</Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </View>
            )}
            
        </View>
    );

    function hideReplyUi() {
        setIsReplying(false);
        setReplyText('');
    }

    async function handleReply() {
        if (onReply) {
            onReply(comment, replyText || "").then((newComment) => {
                console.log('New comment added:', newComment);
            }).catch((error) => {
                console.error('Error adding reply:', error);
                throw error;
            });
        }
    }
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

