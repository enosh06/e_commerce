# Admin Setup Guide

This guide explains how to set up your first admin user for the cartX admin dashboard.

## Creating Your First Admin User

1. **Sign Up for an Account**
   - Navigate to `/auth` in your application
   - Create a new account using the sign-up form
   - Use a valid email and password (minimum 6 characters)

2. **Get Your User ID**
   - After signing up, open the Cloud tab in Lovable
   - Go to Database → Tables → user_roles
   - Note: If you don't see any rows yet, that's normal - the user_roles table starts empty

3. **Add Admin Role**
   - In the Cloud tab, go to Database → Tables → user_roles
   - Click "Insert Row"
   - Fill in the fields:
     - `user_id`: Your user ID (found in the auth.users table or from the signup response)
     - `role`: Select "admin" from the dropdown
   - Click "Save"

   Alternatively, you can use the SQL editor to run:
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('your-user-id-here', 'admin');
   ```

4. **Verify Admin Access**
   - Sign out and sign back in
   - You should now see a user menu in the top right corner
   - Click the user icon to access the "Admin Dashboard" option
   - The admin dashboard is available at `/admin`

## Admin Features

Once you have admin access, you can:

- **View Dashboard Statistics**: See total users, orders, and growth metrics
- **Manage Users**: View all users and toggle their admin/user roles
- **Access Protected Routes**: Admin-only pages are automatically protected

## Security Notes

- Admin roles are stored in a separate `user_roles` table (not in the users table) to prevent privilege escalation attacks
- Row Level Security (RLS) policies ensure only admins can modify roles
- Authentication is required for all admin routes
- Admin status is verified server-side, not client-side

## Troubleshooting

**Can't see Admin Dashboard option?**
- Make sure you've added the admin role to your user
- Try signing out and signing back in
- Check that email auto-confirmation is enabled in your auth settings

**Getting redirected to login?**
- Ensure you're signed in
- Verify your user has the admin role in the user_roles table
