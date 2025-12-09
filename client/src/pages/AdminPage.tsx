import { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreVertical,
  BookOpen,
  Settings,
  Shield
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Dados mockados de cursos
  const courses = [
    { id: 1, name: "Técnico em Informática", code: "TEC-INFO", months: 12, positions: 7, active: true },
    { id: 2, name: "Técnico em Administração", code: "TEC-ADM", months: 12, positions: 6, active: true },
    { id: 3, name: "Técnico em Enfermagem", code: "TEC-ENF", months: 18, positions: 4, active: true },
    { id: 4, name: "Técnico em Contabilidade", code: "TEC-CONT", months: 12, positions: 5, active: true },
    { id: 5, name: "Técnico em Logística", code: "TEC-LOG", months: 12, positions: 6, active: true },
    { id: 6, name: "Técnico em Segurança do Trabalho", code: "TEC-SEG", months: 12, positions: 3, active: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Administração</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie cursos, regras de validação e configurações do sistema.
        </p>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Cursos e Regras
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Shield className="w-4 h-4" />
            Usuários e Permissões
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="w-4 h-4" />
            Configurações Gerais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar cursos..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Curso
            </Button>
          </div>

          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead>Nome do Curso</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead className="text-center">Exp. Mínima</TableHead>
                    <TableHead className="text-center">Cargos Aceitos</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{course.code}</TableCell>
                      <TableCell className="text-center">{course.months} meses</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="font-normal">
                          {course.positions} cargos
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={course.active ? "default" : "secondary"}
                          className={course.active ? "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20 border-chart-2/20" : ""}
                        >
                          {course.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Usuários do Sistema</CardTitle>
              <CardDescription>Gerencie quem tem acesso ao painel administrativo.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <Shield className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Módulo em desenvolvimento</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                A gestão de usuários estará disponível na próxima atualização do sistema.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>Ajuste parâmetros globais de validação e OCR.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <h3 className="font-medium">Parâmetros de OCR</h3>
                <div className="p-4 border rounded-md bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Engine de OCR</span>
                    <Badge variant="outline">PaddleOCR</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Confiança Mínima</span>
                    <span className="text-sm font-mono">85%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <h3 className="font-medium">Limites de Upload</h3>
                <div className="p-4 border rounded-md bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Tamanho Máximo</span>
                    <span className="text-sm font-mono">10 MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Formatos Permitidos</span>
                    <span className="text-sm font-mono">PDF, JPG, PNG</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
