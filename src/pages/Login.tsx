import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BehumanLogo from "@/components/BehumanLogo";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - redirect to app
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with logo - Mobile optimized */}
      <div className="flex-shrink-0 pt-8 pb-4 px-6">
        <div className="text-center space-y-2">
          <BehumanLogo size={56} className="mx-auto" />
          <h1 className="text-xl font-bold text-foreground">behuman</h1>
        </div>
      </div>

      {/* Main content - Centered and mobile optimized */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        <div className="w-full max-w-sm mx-auto space-y-6">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Bienvenido de vuelta
            </h2>
            <p className="text-sm text-muted-foreground">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-medium mt-2">
              Iniciar sesión
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?
          </p>

          <Link to="/register" className="block">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium"
            >
              Crear una cuenta
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer - Fixed at bottom on mobile */}
      <div className="flex-shrink-0 pb-6 px-6">
        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          Al continuar, aceptas nuestros{" "}
          <Link to="#" className="text-primary hover:underline">
            Términos de servicio
          </Link>{" "}
          y{" "}
          <Link to="#" className="text-primary hover:underline">
            Política de privacidad
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
