-- ========================================================
-- ISAAC.AI FOUNDER OS SUPABASE DATABASE SCHEMA MIGRATION
-- ========================================================

-- 1. Founder Memory Graph Central Table
CREATE TABLE IF NOT EXISTS founder_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  startup_name VARCHAR(255) DEFAULT 'My Startup',
  tagline TEXT,
  industry VARCHAR(255) DEFAULT 'Technology',
  country VARCHAR(100) DEFAULT 'United States',
  state VARCHAR(100),
  funding_stage VARCHAR(100) DEFAULT 'Idea',
  team_size INT DEFAULT 1,
  current_revenue NUMERIC DEFAULT 0,
  business_model TEXT,
  target_customers TEXT,
  goals JSONB DEFAULT '[]'::jsonb,
  pain_points JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Stage Progress Nodes
CREATE TABLE IF NOT EXISTS stage_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  stage_id VARCHAR(100) NOT NULL,
  completion_percentage INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'not_started',
  node_data JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_stage UNIQUE (user_id, stage_id)
);

-- 3. Stage 1: Idea Validation Workspace
CREATE TABLE IF NOT EXISTS idea_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  idea_score INT DEFAULT 75,
  execution_score INT DEFAULT 70,
  investment_readiness INT DEFAULT 65,
  market_validation TEXT,
  swot JSONB DEFAULT '{}'::jsonb,
  lean_canvas JSONB DEFAULT '{}'::jsonb,
  icp JSONB DEFAULT '{}'::jsonb,
  risk_analysis JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Stage 2: Saved Resources & Tool Stack
CREATE TABLE IF NOT EXISTS user_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  resource_id VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  is_bookmarked BOOLEAN DEFAULT false,
  is_completed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_resource UNIQUE (user_id, resource_id)
);

-- 5. Stage 3: Business Documentation Tracker
CREATE TABLE IF NOT EXISTS business_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  doc_id VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Not Started',
  urgency VARCHAR(50) DEFAULT 'Important',
  uploaded_files JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_doc UNIQUE (user_id, doc_id)
);

-- 6. Stage 4: Matched Government Grants
CREATE TABLE IF NOT EXISTS matched_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  grant_id VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  fit_score INT DEFAULT 85,
  status VARCHAR(50) DEFAULT 'Discovered',
  applied_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT unique_user_grant UNIQUE (user_id, grant_id)
);

-- 7. Stage 5: Investor CRM
CREATE TABLE IF NOT EXISTS investor_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  investor_id VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  outreach_status VARCHAR(50) DEFAULT 'Interested',
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_investor UNIQUE (user_id, investor_id)
);

-- 8. Stage 6: Business Performance Metrics & Financial History
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  business_name VARCHAR(255) DEFAULT 'My Startup',
  mrr NUMERIC DEFAULT 0,
  arr NUMERIC DEFAULT 0,
  monthly_expenses NUMERIC DEFAULT 0,
  cac NUMERIC DEFAULT 0,
  ltv NUMERIC DEFAULT 0,
  total_customers INT DEFAULT 0,
  burn_rate NUMERIC DEFAULT 0,
  runway_months INT DEFAULT 12,
  metrics_history JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_stage_nodes_user ON stage_nodes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_resources_user ON user_resources(user_id);
CREATE INDEX IF NOT EXISTS idx_business_docs_user ON business_documents(user_id);
