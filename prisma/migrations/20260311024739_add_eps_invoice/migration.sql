-- CreateEnum
CREATE TYPE "RegimeType" AS ENUM ('CONTRIBUTIVO', 'SUBSIDIADO');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'PARTIAL_PAID', 'TOTAL_DISPUTED', 'PARTIAL_DISPUTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Eps" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "tax_id" VARCHAR(50) NOT NULL,
    "legal_name" VARCHAR(255) NOT NULL,
    "commercial_name" VARCHAR(255),
    "portfolio_email" VARCHAR(255),
    "portfolio_phone" VARCHAR(20),
    "contact_name" VARCHAR(255),
    "contact_position" VARCHAR(255),
    "payment_term_days" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Eps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "invoice_number" VARCHAR(50) NOT NULL,
    "eps_id" TEXT NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "copayment" DECIMAL(18,2) NOT NULL,
    "moderator_fee" DECIMAL(18,2) NOT NULL,
    "net_amount" DECIMAL(18,2) NOT NULL,
    "billing_period" VARCHAR(50),
    "regime_type" "RegimeType" NOT NULL,
    "filing_number" VARCHAR(50),
    "filing_date" TIMESTAMP(3),
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
    "data_source" VARCHAR(50) NOT NULL,
    "notes" TEXT,
    "source_file" VARCHAR(500),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Eps_code_key" ON "Eps"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Eps_tax_id_key" ON "Eps"("tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoice_number_key" ON "Invoice"("invoice_number");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_eps_id_fkey" FOREIGN KEY ("eps_id") REFERENCES "Eps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
