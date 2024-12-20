import { Home } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '../ui/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex gap-4 flex-col items-center justify-center ">
      <h1 className="text-5xl">404</h1>
      <div className="text-center text-muted-foreground text-xl  flex flex-col items-center">
        <h3 className="">Oops!</h3>
        <p>Sorry, page not fond!!</p>
        <Button  className='mt-5' variant="outline" onClick={() => navigate('/')}>
          <Home />
          Go home
        </Button>
      </div>
    </div>
  );
}
