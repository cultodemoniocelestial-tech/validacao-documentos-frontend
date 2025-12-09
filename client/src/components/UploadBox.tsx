import { useState, useRef } from "react";
import { Upload, File, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UploadBoxProps {
  onUploadComplete: (file: File) => void;
}

export default function UploadBox({ onUploadComplete }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Formato inválido. Apenas PDF, JPG e PNG são aceitos.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
      toast.error("Arquivo muito grande. Máximo de 10MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulação de upload
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onUploadComplete(file);
          toast.success("Upload concluído com sucesso!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-10 text-center transition-colors cursor-pointer",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
          />
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Arraste e solte seu documento</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Suportamos PDF, JPG e PNG (máx. 10MB). Ideal para Carteira de Trabalho e Holerites.
          </p>
          <Button variant="outline" className="pointer-events-none">
            Selecionar Arquivo
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg p-6 bg-card">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-sm flex items-center justify-center">
                <File className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium truncate max-w-[200px] sm:max-w-md">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!uploading && (
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          {uploading ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Enviando...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          ) : (
            <div className="flex gap-3 mt-6">
              <Button onClick={handleUpload} className="flex-1">
                Confirmar e Analisar
              </Button>
              <Button variant="outline" onClick={removeFile}>
                Cancelar
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-start gap-3 p-4 rounded-md bg-muted/30">
          <CheckCircle2 className="w-5 h-5 text-chart-2 mt-0.5" />
          <div>
            <p className="font-medium text-sm">OCR Automático</p>
            <p className="text-xs text-muted-foreground mt-1">Extração inteligente de dados</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-md bg-muted/30">
          <CheckCircle2 className="w-5 h-5 text-chart-2 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Validação Rápida</p>
            <p className="text-xs text-muted-foreground mt-1">Verificação instantânea de regras</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-md bg-muted/30">
          <CheckCircle2 className="w-5 h-5 text-chart-2 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Segurança Total</p>
            <p className="text-xs text-muted-foreground mt-1">Seus dados estão protegidos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
