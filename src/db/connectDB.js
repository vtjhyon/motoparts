import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nyvzoyhdtwzpnstpygou.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dnpveWhkdHd6cG5zdHB5Z291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1NDgzNTcsImV4cCI6MTk5NjEyNDM1N30.bvxDsp_qSQIdjrPrkFKIvGqb1vDpGeWRWVl3f7me0DY';

export const supabase = createClient(supabaseUrl, supabaseKey);

