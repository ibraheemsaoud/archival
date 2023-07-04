import { toast } from "react-hot-toast";
import { updateVerification } from "../../requests";
import { HOME } from "../../consts/links.const";
import { useUser } from "../../hooks";

export const verificationLoader =
  () =>
  async ({ request }: { request: Request }) => {
    const { user } = useUser();
    if (user?.emailVerification) {
      window.location.href = HOME;
      return {};
    }
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");
    const expire = url.searchParams.get("expire");

    if (!userId || !secret || !expire) {
      toast.error(
        "failed to verify, please click the link again or contact support",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
      return {};
    }

    try {
      const { error } = await updateVerification(userId, secret);
      if (error) {
        toast.error(
          "failed to verify, please click the link again or contact support",
          {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
        return {};
      }
      window.location.href = HOME;
    } catch (e) {
      toast.error(e as string, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return {};
    }
  };
