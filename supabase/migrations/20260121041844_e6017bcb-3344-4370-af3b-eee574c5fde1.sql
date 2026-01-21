-- Create table for policy proposal submissions
CREATE TABLE public.policy_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  registration_id UUID REFERENCES public.delegate_registrations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_name TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  feedback TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.policy_proposals ENABLE ROW LEVEL SECURITY;

-- Users can view their own proposals
CREATE POLICY "Users can view own proposals"
  ON public.policy_proposals FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own proposals
CREATE POLICY "Users can create own proposals"
  ON public.policy_proposals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own draft proposals
CREATE POLICY "Users can update own draft proposals"
  ON public.policy_proposals FOR UPDATE
  USING (auth.uid() = user_id AND status = 'draft');

-- Admins can view all proposals
CREATE POLICY "Admins can view all proposals"
  ON public.policy_proposals FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage all proposals
CREATE POLICY "Admins can manage all proposals"
  ON public.policy_proposals FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_policy_proposals_updated_at
  BEFORE UPDATE ON public.policy_proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for policy proposals
INSERT INTO storage.buckets (id, name, public) 
VALUES ('policy-proposals', 'policy-proposals', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for policy proposals
CREATE POLICY "Users can upload their own proposals"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'policy-proposals' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own proposals"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'policy-proposals' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all proposals"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'policy-proposals' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage all proposal files"
  ON storage.objects FOR ALL
  USING (bucket_id = 'policy-proposals' AND has_role(auth.uid(), 'admin'::app_role));