import { FileText, Calendar, Building2, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  id: string;
  filename: string;
  status: "approved" | "rejected" | "manual_review" | "processing";
  company?: string;
  position?: string;
  date?: string;
  onClick?: () => void;
}

export default function DocumentCard({ 
  id, 
  filename, 
  status, 
  company, 
  position, 
  date,
  onClick 
}: DocumentCardProps) {
  
  const statusConfig = {
    approved: {
      label: "Aprovado",
      className: "bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/20"
    },
    rejected: {
      label: "Reprovado",
      className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
    },
    manual_review: {
      label: "Revisão Manual",
      className: "bg-chart-4/10 text-chart-4 border-chart-4/20 hover:bg-chart-4/20"
    },
    processing: {
      label: "Processando",
      className: "bg-chart-5/10 text-chart-5 border-chart-5/20 hover:bg-chart-5/20"
    }
  };

  const config = statusConfig[status];

  return (
    <div 
      className="group border border-border rounded-lg p-5 bg-card hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-sm flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium truncate max-w-[180px]">{filename}</h4>
            <p className="text-xs text-muted-foreground">ID: {id}</p>
          </div>
        </div>
        <Badge variant="outline" className={cn("font-medium", config.className)}>
          {config.label}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        {company && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span className="truncate">{company}</span>
          </div>
        )}
        {position && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span className="truncate">{position}</span>
          </div>
        )}
        {date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border flex justify-end">
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 -mr-2">
          Ver Detalhes
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
