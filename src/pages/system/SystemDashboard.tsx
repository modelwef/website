useEffect(() => {
  const gate = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const email = userData.user?.email?.toLowerCase() ?? null;

    if (!email) {
      navigate("/system/login", { replace: true });
      return;
    }

    const { data, error } = await supabase
      .from("system_admins")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (error || !data?.email) {
      await supabase.auth.signOut();
      navigate("/system/login", { replace: true });
      return;
    }

    setAllowed(true);
  };

  void gate();
}, [navigate]);
