import { ref } from "vue";
import useSupabase from "src/boot/supabase";

const user = ref(null);

export default function userAuthUser() {
  const { supabase } = useSupabase();

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return user;
  };

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = () => {
    return !!user.value;
  };

  const register = async ({ email, password, ...meta }) => {
    console.log(meta);
    const { user, error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          data: meta,
          emailRedirectTo: `http://derickongeri.com/greenpulse/#/confirm-signup`,
        },
      }
    );
    if (error) throw error;
    return user;
  };

  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://derickongeri.com/greenpulse/#/update-password",
    });
    if (error) throw error;
    return user;
  };

  const updateUserPassword = async (new_password) => {
    const { user, error } = await supabase.auth.updateUser({
      password: new_password,
    });
    if (error) throw error;
    return user;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    updateUserPassword,
  };
}
