import { Navigate, Params } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateVerification } from "../../requests";
import { HOME } from "../../consts/links.const";

//https://archivals.eu/verification?userId=64a44814b385b8ea84a5&secret=a74f9d514f6d641eaba88cfdc0604b3e6c93316ab54eb80d03a3ac9dc3175be37bcd22d960074facf52807536e9e50382c355326c1666dd34d6bcb07f6c078615947a8ba15a77418fdc816cf570b056b3f021fe45bb42a7432b102d5ab43264b68d8bb40a357fec85cd4634d11d61c4cc3332aad35c8bddae84f7c3639593df7&expire=2023-07-11+16%3A40%3A06.680
export const verificationLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { userId, secret, expire } = params;
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
      Navigate({ to: HOME, replace: true });
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
