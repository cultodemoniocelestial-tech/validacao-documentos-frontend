import { CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultBadgeProps {
  status: "approved" | "rejected" | "manual_review" | "pending";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export default function ResultBadge({ 
  status, 
  size = "md", 
  showLabel = true,
  className 
}: ResultBadgeProps) {
  
  const config = {
    approved: {
      icon: CheckCircle2,
      label: "Aprovado",
      color: "text-chart-2",
      bg: "bg-chart-2/10",
      border: "border-chart-2/20"
    },
    rejected: {
      icon: XCircle,
      label: "Reprovado",
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/20"
    },
    manual_review: {
      icon: AlertTriangle,
      label: "Revisão Manual",
      color: "text-chart-4",
      bg: "bg-chart-4/10",
      border: "border-chart-4/20"
    },
    pending: {
      icon: Clock,
      label: "Pendente",
      color: "text-chart-5",
      bg: "bg-chart-5/10",
      border: "border-chart-5/20"
    }
  };

  const { icon: Icon, label, color, bg, border } = config[status];

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1.5",
    md: "text-sm px-3 py-1 gap-2",
    lg: "text-base px-4 py-1.5 gap-2.5"
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        bg,
        color,
        border,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && <span>{label}</span>}
    </div>
  );
}
