import { useState } from "react";
import { useLocation } from "wouter";
import { FileText, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import UploadBox from "@/components/UploadBox";
import { toast } from "sonner";

export default function UploadPage() {
  const [_, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const courses = [
    { id: "1", name: "Técnico em Informática", code: "TEC-INFO" },
    { id: "2", name: "Técnico em Administração", code: "TEC-ADM" },
    { id: "3", name: "Técnico em Enfermagem", code: "TEC-ENF" },
    { id: "4", name: "Técnico em Contabilidade", code: "TEC-CONT" },
    { id: "5", name: "Técnico em Logística", code: "TEC-LOG" },
  ];

  const handleUploadComplete = (file: File) => {
    setUploadedFile(file);
    // Simular processamento e redirecionar
    setTimeout(() => {
      toast.success("Documento processado com sucesso!");
      setLocation("/dashboard/results");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Nova Validação</h1>
        <p className="text-muted-foreground mt-2">
          Envie documentos para análise automática de experiência profissional.
        </p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between relative mb-12">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10" />
        
        <div className="flex flex-col items-center gap-2 bg-background px-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 1 ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted text-muted-foreground'}`}>
            1
          </div>
          <span className="text-xs font-medium text-primary">Curso</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 bg-background px-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 2 ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted text-muted-foreground'}`}>
            2
          </div>
          <span className={`text-xs font-medium ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>Documento</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 bg-background px-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 3 ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted text-muted-foreground'}`}>
            3
          </div>
          <span className={`text-xs font-medium ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>Análise</span>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>
            {step === 1 ? "Selecione o Curso Técnico" : "Upload de Documentos"}
          </CardTitle>
          <CardDescription>
            {step === 1 
              ? "Escolha o curso para o qual deseja validar a experiência profissional." 
              : "Envie a Carteira de Trabalho ou declaração de experiência."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="course">Curso Técnico</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger id="course" className="h-12">
                    <SelectValue placeholder="Selecione um curso..." />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} ({course.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted/30 p-4 rounded-md border border-border">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-chart-5" />
                  Requisitos para validação
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-1">
                  <li>Documento deve estar legível e sem rasuras</li>
                  <li>Deve conter nome da empresa, cargo e datas de entrada/saída</li>
                  <li>Formatos aceitos: PDF, JPG, PNG (máx. 10MB)</li>
                </ul>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!selectedCourse}
                  className="gap-2"
                >
                  Próximo Passo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-muted/30 p-3 rounded-md border border-border mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-sm flex items-center justify-center text-primary">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Curso Selecionado</p>
                    <p className="text-xs text-muted-foreground">
                      {courses.find(c => c.id === selectedCourse)?.name}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  Alterar
                </Button>
              </div>

              <UploadBox onUploadComplete={handleUploadComplete} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
