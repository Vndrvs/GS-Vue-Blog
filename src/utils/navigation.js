import { useRouter } from "vue-router";

export function useNavigation() {
  const router = useRouter();

  const goBackUsingBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/home");
    }
  };

  const goToHome = () => router.push("/home");
  const goTo = (path) => router.push(path);

  return { goBackUsingBack, goToHome, goTo };
}