import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ResultBadge from "@/components/ResultBadge";

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Dados mockados
  const results = [
    { id: "DOC-8492", user: "Carlos Silva", course: "Técnico em Informática", company: "Tech Solutions Ltda", position: "Analista de Suporte", months: 24, required: 12, status: "approved", date: "14/05/2024" },
    { id: "DOC-8491", user: "Ana Oliveira", course: "Técnico em Enfermagem", company: "Hospital Santa Clara", position: "Auxiliar de Enfermagem", months: 18, required: 18, status: "manual_review", date: "14/05/2024" },
    { id: "DOC-8490", user: "Roberto Santos", course: "Técnico em Administração", company: "Comércio Silva", position: "Vendedor", months: 36, required: 12, status: "rejected", date: "14/05/2024" },
    { id: "DOC-8489", user: "Fernanda Lima", course: "Técnico em Logística", company: "Logística Express", position: "Auxiliar de Logística", months: 14, required: 12, status: "approved", date: "14/05/2024" },
    { id: "DOC-8488", user: "Paulo Mendes", course: "Técnico em Informática", company: "Web Devs SA", position: "Desenvolvedor Jr", months: 12, required: 12, status: "approved", date: "14/05/2024" },
    { id: "DOC-8487", user: "Juliana Costa", course: "Técnico em Contabilidade", company: "Escritório Contábil", position: "Assistente", months: 8, required: 12, status: "rejected", date: "13/05/2024" },
    { id: "DOC-8486", user: "Marcos Pereira", course: "Técnico em Administração", company: "Indústria ABC", position: "Auxiliar Adm", months: 20, required: 12, status: "approved", date: "13/05/2024" },
  ];

  const filteredResults = results.filter(item => 
    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Resultados</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie e analise as validações de documentos processados.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por nome, curso ou empresa..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Candidato</TableHead>
              <TableHead>Curso / Empresa</TableHead>
              <TableHead>Cargo Identificado</TableHead>
              <TableHead className="text-center">Exp. (Meses)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/30">
                <TableCell className="font-medium text-xs text-muted-foreground">
                  {item.id}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{item.user}</div>
                  <div className="text-xs text-muted-foreground">{item.date}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{item.course}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    {item.company}
                  </div>
                </TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell className="text-center">
                  <span className={item.months >= item.required ? "text-chart-2 font-medium" : "text-destructive font-medium"}>
                    {item.months}
                  </span>
                  <span className="text-xs text-muted-foreground"> / {item.required}</span>
                </TableCell>
                <TableCell>
                  <ResultBadge status={item.status as any} size="sm" />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Baixar Relatório</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Excluir Registro</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-between px-4 py-4 border-t border-border bg-muted/20">
          <div className="text-sm text-muted-foreground">
            Mostrando <strong>{filteredResults.length}</strong> de <strong>{results.length}</strong> resultados
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" disabled>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
