export const createToast = (
  title: string,
  desc: string,
  status: 'info' | 'warning' | 'success' | 'error' | undefined = 'info',
  duration: number = 1500,
  isClosable: boolean = false
) => {
  return {
      title,
      description: desc,
      status,
      duration,
      isClosable,
  };
};