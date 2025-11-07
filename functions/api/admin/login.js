// Admin login API endpoint
// POST /api/admin/login - Authenticate admin user

export async function onRequestPost({ request, env }) {
    try {
        const { username, password } = await request.json();
        
        // Get credentials from environment variables
        const ADMIN_USER = env.ADMIN_USER;
        const ADMIN_PASS = env.ADMIN_PASS;
        
        // Validate credentials
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            // Generate a simple session token (in production, use JWT or similar)
            const sessionToken = btoa(`${username}:${Date.now()}`);
            
            return new Response(JSON.stringify({ 
                success: true,
                message: 'Login successful',
                sessionToken: sessionToken
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        } else {
            return new Response(JSON.stringify({ 
                success: false,
                message: 'Invalid credentials'
            }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
    } catch (error) {
        return new Response(JSON.stringify({ 
            success: false,
            error: 'Login failed',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
