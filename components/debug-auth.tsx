"use client"

import { useAuth } from "@/lib/auth-context"

export function DebugAuth() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading authentication state...</div>
  }

  return (
    <div className="p-4 border rounded-md bg-muted">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <pre className="text-xs overflow-auto p-2 bg-background rounded">
        {JSON.stringify({ user, isAuthenticated: !!user }, null, 2)}
      </pre>
    </div>
  )
}
