-- Apply after 001_init.sql. Only staff may change request status.
revoke update on table public.service_requests from authenticated;
grant update (status) on table public.service_requests to authenticated;
-- Public role never receives write access to private bookings.
revoke all on table public.service_requests from anon;
-- Protect against untrusted users creating a staff role through PostgREST.
revoke insert, update, delete on table public.staff_roles from anon, authenticated;
-- Restrict default public function execution (staff check is explicitly granted).
revoke execute on function public.is_staff() from anon;
