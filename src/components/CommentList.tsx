import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import GlobalStyles from '@/styles/global';
import { CommentDTO } from '@/dto/commentDTO';
import CommentListItem from '@/components/CommentItemList';

type CommentListProps = {
    comments: CommentDTO[];
    onCommentPress?: (comment: CommentDTO) => void;
    onReply?: (reply: string) => Promise<CommentDTO>;
    onUserPress?: (userId: string) => void;
};

const CommentList: React.FC<CommentListProps> = ({ comments, onCommentPress, onReply, onUserPress }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            {comments.map((comment) => (
                <CommentListItem
                    key={comment.id}
                    comment={comment}
                    onPress={onCommentPress}
                    onReply={onReply}
                    onUserPress={onUserPress}
                />
            ))}
        </View>
    );
};

export default CommentList;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container
    }
});