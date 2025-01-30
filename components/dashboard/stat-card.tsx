import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
}

export function StatsCard({ icon: Icon, title, value }: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-card border-input p-6 shadow">
      <div className="pt-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
