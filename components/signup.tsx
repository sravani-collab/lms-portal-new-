import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen justify-center items-center px-4",
        className
      )}
      {...props}
    >
      <Card className="max-w-md w-full bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-md border border-[hsl(var(--border))]">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Login</CardTitle>
          <CardDescription className="text-[hsl(var(--muted-foreground))]">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-[hsl(var(--primary-foreground))] font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] focus:ring-[hsl(var(--ring))] focus:ring-2"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="text-[hsl(var(--primary-foreground))] font-medium"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-[hsl(var(--accent-foreground))] underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] focus:ring-[hsl(var(--ring))] focus:ring-2"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full border-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors"
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-[hsl(var(--muted-foreground))]">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="underline underline-offset-4 text-[hsl(var(--accent-foreground))] hover:text-[hsl(var(--primary))]"
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
