import { CommentDTO } from "@/dto/commentDTO";
import { EventDTO } from "@/dto/eventDTO";
import GlobalStyles from "@/styles/global";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View, Text, TextInput, StyleSheet } from "react-native";

type CommentInputsProps = | {
  event: EventDTO;
  onComment: (event: EventDTO, replyText: string) => Promise<CommentDTO>;
} | {
  comment: CommentDTO;
  onReply: (comment: CommentDTO, replyText: string) => Promise<CommentDTO>;
};

const CommentInputs: React.FC<CommentInputsProps> = (props : CommentInputsProps) => {
  const { t } = useTranslation();
  const [replyText, setReplyText] = useState<string>("");
  const [isReplying, setIsReplying] = useState<boolean>(false);

  return (
    <View style={styles.replyContainer}>
      {!isReplying && (
        <Pressable onPress={() => setIsReplying(true)}>
          <Text style={styles.sendReplyButton}>{t("reply")}</Text>
        </Pressable>
      )}
      {isReplying && (
        <>
          <TextInput
            style={styles.replyInput}
            multiline={true}
            placeholder={t("write_reply")}
            value={replyText || ""}
            onChangeText={setReplyText}
          />
          <View style={styles.replyActionsContainer}>
            <Pressable onPress={hideReplyUi}>
              <Text style={styles.cancelReplyButton}>{t("cancel")}</Text>
            </Pressable>
            <Pressable onPress={handleReply}>
              <Text style={styles.sendReplyButton}>{t("send")}</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );

  function hideReplyUi() {
    setIsReplying(false);
    setReplyText("");
  }

  async function handleReply() {
    if ("event" in props) {
      await props.onComment(props.event, replyText);
    } else {
      await props.onReply(props.comment, replyText);
    }
    hideReplyUi();
  }
};

export default CommentInputs;

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