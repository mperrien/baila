import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hremmpjuajzijzwrjqms.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyZW1tcGp1YWp6aWp6d3JqcW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjcxNTEsImV4cCI6MjA1Mzg0MzE1MX0.QTSgVM6tbDetIRs_h8yHhNWvvGPO66jOxbNcsESdQBQ",
);
