import { useState } from "react";
import { Link } from "wouter";
import { 
  BarChart3, 
  Users, 
  FileCheck, 
  Clock, 
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ResultBadge from "@/components/ResultBadge";

export default function Dashboard() {
  // Dados mockados para exemplo
  const stats = [
    { 
      title: "Total de Validações", 
      value: "1,284", 
      change: "+12.5%", 
      trend: "up",
      icon: FileCheck,
      color: "text-primary"
    },
    { 
      title: "Aprovações Automáticas", 
      value: "842", 
      change: "+8.2%", 
      trend: "up",
      icon: BarChart3,
      color: "text-chart-2"
    },
    { 
      title: "Revisão Manual", 
      value: "156", 
      change: "-2.4%", 
      trend: "down",
      icon: Users,
      color: "text-chart-4"
    },
    { 
      title: "Tempo Médio", 
      value: "1.2s", 
      change: "-15%", 
      trend: "down", // down is good for time
      icon: Clock,
      color: "text-chart-5"
    },
  ];

  const recentValidations = [
    { id: "DOC-8492", user: "Carlos Silva", course: "Técnico em Informática", status: "approved", date: "Hoje, 14:30" },
    { id: "DOC-8491", user: "Ana Oliveira", course: "Técnico em Enfermagem", status: "manual_review", date: "Hoje, 14:15" },
    { id: "DOC-8490", user: "Roberto Santos", course: "Técnico em Administração", status: "rejected", date: "Hoje, 13:45" },
    { id: "DOC-8489", user: "Fernanda Lima", course: "Técnico em Logística", status: "approved", date: "Hoje, 13:20" },
    { id: "DOC-8488", user: "Paulo Mendes", course: "Técnico em Informática", status: "approved", date: "Hoje, 12:55" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do sistema de validação de documentos.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-chart-2 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-chart-2 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-chart-2" : "text-chart-2"}>
                  {stat.change}
                </span>
                <span className="ml-1">vs. mês anterior</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Area (Placeholder) */}
        <Card className="col-span-4 border-border shadow-sm">
          <CardHeader>
            <CardTitle>Volume de Validações</CardTitle>
            <CardDescription>
              Processamento diário nos últimos 30 dias
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-end justify-between gap-2 px-4 pb-4 pt-10">
              {/* Fake Chart Bars */}
              {[35, 45, 30, 60, 75, 50, 65, 80, 70, 55, 40, 60, 75, 85, 90].map((height, i) => (
                <div key={i} className="w-full bg-primary/10 hover:bg-primary/20 rounded-t-sm relative group transition-all">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all duration-500"
                    style={{ height: `${height}%` }}
                  ></div>
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border">
                    {height * 12} validações
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Validações Recentes</CardTitle>
              <CardDescription>
                Últimos 5 documentos processados
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentValidations.map((item) => (
                <div key={item.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {item.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.user}</p>
                      <p className="text-xs text-muted-foreground">{item.course}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <ResultBadge status={item.status as any} size="sm" showLabel={false} />
                    <span className="text-[10px] text-muted-foreground">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link href="/dashboard/results">
                <Button variant="outline" className="w-full">
                  Ver Todos os Resultados
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
