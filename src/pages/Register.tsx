import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import BehumanLogo from "@/components/BehumanLogo";
import { Eye, EyeOff, Check } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - no backend logic
    console.log("Register attempt:", { name, email });
  };

  const passwordRequirements = [
    { label: "Al menos 8 caracteres", met: password.length >= 8 },
    { label: "Una letra mayúscula", met: /[A-Z]/.test(password) },
    { label: "Un número", met: /\d/.test(password) },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with logo - Mobile optimized */}
      <div className="flex-shrink-0 pt-8 pb-4 px-6">
        <div className="text-center space-y-2">
          <BehumanLogo size={56} className="mx-auto" />
          <h1 className="text-xl font-bold text-foreground">behuman</h1>
        </div>
      </div>

      {/* Main content - Scrollable on mobile */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="w-full max-w-sm mx-auto space-y-5">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Crea tu cuenta
            </h2>
            <p className="text-sm text-muted-foreground">
              Comienza tu viaje hacia una vida más saludable
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

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
              {password && (
                <div className="space-y-1.5 pt-2">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-xs transition-colors ${
                        req.met ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          req.met ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        {req.met && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                      </div>
                      {req.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start space-x-3 pt-1">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-xs font-normal leading-relaxed cursor-pointer">
                Acepto los{" "}
                <Link to="#" className="text-primary hover:underline">
                  Términos de servicio
                </Link>{" "}
                y la{" "}
                <Link to="#" className="text-primary hover:underline">
                  Política de privacidad
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={!acceptTerms}
            >
              Crear cuenta
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?
          </p>

          <Link to="/login" className="block">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium"
            >
              Iniciar sesión
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
