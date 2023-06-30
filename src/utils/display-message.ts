export const displayMessage = (
  messageApi: any,
  type: string,
  content: string
) => {
  messageApi.open({
    type: type,
    content: content,
    duration: 5,
  });
};
