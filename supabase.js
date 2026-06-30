/* =========================================================
   TET Success
   Supabase Connection
   ========================================================= */

const supabase = window.supabase.createClient(
    CONFIG.SUPABASE_URL,
    CONFIG.SUPABASE_PUBLISHABLE_KEY,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
        },

        global: {
            headers: {
                "X-Client-Info": "TET-Success-Web"
            }
        }
    }
);

/* ---------------------------------------------------------
   Check Database Connection
--------------------------------------------------------- */

async function checkSupabaseConnection() {

    try {

        const { error } = await supabase
            .from(CONFIG.TABLES.APP_SETTINGS)
            .select("id")
            .limit(1);

        if (error) {

            console.error("Supabase Connection Failed", error);

            return false;

        }

        console.log("Supabase Connected Successfully");

        return true;

    } catch (err) {

        console.error(err);

        return false;

    }

}

/* ---------------------------------------------------------
   Initialize Backend
--------------------------------------------------------- */

async function initializeBackend() {

    const connected = await checkSupabaseConnection();

    if (!connected) {

        console.error("Unable to connect database.");

        return false;

    }

    const settingsLoaded = await loadTetAppSettings();

    if (!settingsLoaded) {

        console.error("Unable to load App Settings.");

        return false;

    }

    console.log("Backend Initialized Successfully");

    return true;

}
