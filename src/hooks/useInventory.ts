import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../stores/authStore';
import type { Product } from '../types';

export function useInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'products'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(products);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { products, loading, error };
}